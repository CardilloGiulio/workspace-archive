#!/usr/bin/env python3
"""
Simple subnet helper.

It can convert:
1) CIDR prefix -> subnet mask + usable hosts
2) Subnet mask -> CIDR prefix + usable hosts
3) Needed hosts -> smallest CIDR prefix + subnet mask
4) Split a network into smaller subnets and show each network address

Note:
If you insert a base network without prefix, like 199.20.30.0,
the program assumes /24.
"""

import ipaddress


def usable_hosts_from_prefix(prefix: int) -> int:
    """Return usable IPv4 hosts for a prefix."""
    total_addresses = 2 ** (32 - prefix)

    if prefix >= 31:
        return 0

    return total_addresses - 2


def mask_from_prefix(prefix: int) -> str:
    """Convert /prefix to subnet mask."""
    network = ipaddress.IPv4Network(f"0.0.0.0/{prefix}")
    return str(network.netmask)


def prefix_from_mask(mask: str) -> int:
    """Convert subnet mask to CIDR prefix."""
    network = ipaddress.IPv4Network(f"0.0.0.0/{mask}")
    return network.prefixlen


def prefix_from_hosts(required_hosts: int) -> int:
    """Find the smallest prefix that can contain the required usable hosts."""
    for prefix in range(32, -1, -1):
        usable_hosts = usable_hosts_from_prefix(prefix)

        if usable_hosts >= required_hosts:
            return prefix

    raise ValueError("Too many hosts requested for IPv4.")


def read_base_network(text: str) -> ipaddress.IPv4Network:
    """
    Read a base network.

    If the user inserts only an IP/network address without /prefix,
    assume /24 because this is common in simple subnet exercises.
    """
    if "/" not in text:
        text = text + "/24"

    return ipaddress.IPv4Network(text, strict=False)


def from_prefix():
    prefix = int(input("Insert CIDR prefix, for example 24 for /24: "))

    if prefix < 0 or prefix > 32:
        print("Invalid prefix. Use a number from 0 to 32.")
        return

    print()
    print(f"CIDR: /{prefix}")
    print(f"Subnet mask: {mask_from_prefix(prefix)}")
    print(f"Usable hosts: {usable_hosts_from_prefix(prefix)}")


def from_subnet_mask():
    mask = input("Insert subnet mask, for example 255.255.255.0: ").strip()

    try:
        prefix = prefix_from_mask(mask)
    except ValueError:
        print("Invalid subnet mask.")
        return

    print()
    print(f"Subnet mask: {mask}")
    print(f"CIDR: /{prefix}")
    print(f"Usable hosts: {usable_hosts_from_prefix(prefix)}")


def from_hosts():
    required_hosts = int(input("Insert needed usable hosts: "))

    if required_hosts < 1:
        print("Hosts must be at least 1.")
        return

    try:
        prefix = prefix_from_hosts(required_hosts)
    except ValueError as error:
        print(error)
        return

    print()
    print(f"Needed usable hosts: {required_hosts}")
    print(f"Best CIDR: /{prefix}")
    print(f"Subnet mask: {mask_from_prefix(prefix)}")
    print(f"Available usable hosts: {usable_hosts_from_prefix(prefix)}")


def split_network():
    base_text = input("Insert base network, for example 192.168.1.0/24: ").strip()
    new_prefix = int(input("Insert new prefix, for example 27 for /27: "))

    try:
        network = read_base_network(base_text)
    except ValueError:
        print("Invalid base network.")
        return

    if new_prefix <= network.prefixlen:
        print("The new prefix must be bigger than the base prefix.")
        print(f"Your base network is {network}, so its prefix is /{network.prefixlen}.")
        print("Example: from /24 to /27 is valid.")
        return

    if new_prefix > 32:
        print("Invalid prefix. Use a number from 0 to 32.")
        return

    subnets = list(network.subnets(new_prefix=new_prefix))
    hosts = usable_hosts_from_prefix(new_prefix)

    print()
    print(f"Base network: {network}")
    print(f"Cut into: /{new_prefix}")
    print(f"Subnet mask: {mask_from_prefix(new_prefix)}")
    print(f"Usable hosts per subnet: {hosts}")
    print(f"Number of subnets: {len(subnets)}")
    print()

    print(f"{'N':<4}{'Network':<20}{'First host':<20}{'Last host':<20}{'Broadcast':<20}")
    print("-" * 84)

    for index, subnet in enumerate(subnets, start=1):
        hosts_list = list(subnet.hosts())

        if hosts_list:
            first_host = hosts_list[0]
            last_host = hosts_list[-1]
        else:
            first_host = "-"
            last_host = "-"

        print(
            f"{index:<4}"
            f"{str(subnet.network_address):<20}"
            f"{str(first_host):<20}"
            f"{str(last_host):<20}"
            f"{str(subnet.broadcast_address):<20}"
        )


def show_menu():
    print()
    print("=== Simple Subnet Helper ===")
    print("1) From /prefix to hosts and subnet mask")
    print("2) From subnet mask to /prefix and hosts")
    print("3) From hosts to /prefix and subnet mask")
    print("4) Split a network and show each network address")
    print("0) Exit")


def main():
    while True:
        show_menu()
        choice = input("Choose an option: ").strip()

        try:
            if choice == "1":
                from_prefix()
            elif choice == "2":
                from_subnet_mask()
            elif choice == "3":
                from_hosts()
            elif choice == "4":
                split_network()
            elif choice == "0":
                print("Bye.")
                break
            else:
                print("Invalid option.")
        except ValueError:
            print("Invalid input. Please insert a valid number.")


if __name__ == "__main__":
    main()
