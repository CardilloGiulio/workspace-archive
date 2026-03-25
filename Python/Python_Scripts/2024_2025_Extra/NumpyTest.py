import numpy as np
import matplotlib.pyplot as plt

data = np.array([
    [1971, 0.74,   0.001 ],
    [1978, 5,      0.064 ],
    [1982, 8,      0.128 ],
    [1985, 16,     0.256 ],
    [1989, 33,     1     ],
    [1993, 66,     4     ],
    [1997, 233,    32    ],
    [1999, 450,    64    ],
    [2002, 2200,   256   ],
    [2006, 3000,   1024  ],
    [2010, 3200,   4096  ],
    [2015, 3600,   8192  ],
    [2020, 4000,   16384 ],
    [2024, 5200,   32768 ],
])


def plot_3d():
    years = data[:, 0]
    cpu_speed = data[:, 1]
    ram = data[:, 2]

    fig = plt.figure(figsize=(10, 10))
    ax = fig.add_subplot(111, projection='3d')
    ax.plot(years, cpu_speed, ram, marker='D', linestyle='--', linewidth=2)
    ax.set_title("Evoluzione dell'hardware del computer (1971–2024)", fontsize=16)
    ax.set_xlabel('Anni', fontsize=12)
    ax.set_ylabel('Velocità CPU (MHz)', fontsize=12)
    ax.set_zlabel('Capacità RAM (MB)', fontsize=12)
    ax.grid(True)
    plt.show()

def plot_2d_vs_cpu_speed():
    years = data[:, 0]
    cpu_speed = data[:, 1]

    plt.figure(figsize=(10, 10))
    plt.plot(years, cpu_speed, marker='D', linestyle='--', linewidth=2)
    plt.title("Evoluzione dell'hardware del computer (1971–2024)", fontsize=16)
    plt.xlabel('Anni', fontsize=12)
    plt.ylabel('Velocità CPU (MHz)', fontsize=12)
    plt.xticks(years)
    plt.grid(True)
    plt.show()

def plot_2d_vs_ram_capacity():
    years = data[:, 0]
    ram = data[:, 2]

    plt.figure(figsize=(10, 10))
    plt.plot(years, ram, marker='D', linestyle='--', linewidth=2)
    plt.title("Evoluzione dell'hardware del computer (1971–2024)", fontsize=16)
    plt.xlabel('Anni', fontsize=12)
    plt.ylabel('Capacità RAM (MB)', fontsize=12)
    plt.xticks(years)
    plt.grid(True)
    plt.show()

def analyze_growth():
    years, cpu, ram = data.T
    descision = input("Vuoi calcolare la crescita della CPU o della RAM? (cpu/ram): ")
    if descision == 'cpu':
        growth_cpu = np.diff(cpu) / np.diff(years)
        print("CPU growth per year:", growth_cpu)
    elif descision == 'ram':
        growth_ram = np.diff(ram) / np.diff(years)
        print("RAM growth per year:", growth_ram)
    else: 
        print("Opzione non valida. Riprova.")
    answer = input("Vuoi visualizzare la crescita in percentuale? (s/n): ")
    if answer == "s":
        if descision == 'cpu':
            growth_cpu_percent = (growth_cpu / cpu[:-1]) * 100
            print("Crescita percentuale della CPU per anno:", growth_cpu_percent)
        elif descision == 'ram':
            growth_ram_percent = (growth_ram / ram[:-1]) * 100
            print("Crescita percentuale della RAM per anno:", growth_ram_percent)
    elif answer == "n":
        print("Crescita non visualizzata.")
    else:
        print("Opzione non valida. Riprova.")
    
def main():
    print("Benvenuto, che tipo di schema desideri visualizzare?")
    menu = """
    1. Plot 3D
    2. Plot 2D vs CPU Speed
    3. Plot 2D vs RAM Capacity
    4. Analizza la crescita della CPU o della RAM
    """
    print(menu)
    scelta = input("Scegli un'opzione (1-4): ")
    if scelta == '1':
        plot_3d()
    elif scelta == '2':
        plot_2d_vs_cpu_speed()
    elif scelta == '3':
        plot_2d_vs_ram_capacity()
    elif scelta == '4':
        analyze_growth()
    else:
        print("Opzione non valida. Riprova.")

main()