using GiulioCardillo.Exercise1.Domain;
using Microsoft.EntityFrameworkCore;

namespace GiulioCardillo.Exercize1.Persistence
{
    public class MyDbContext : DbContext
    {
        public DbSet<Market> Markets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=host.docker.internal;Port=5432;Username=postgres;Password=mypassword;Database=mydb;Include Error Detail=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Market>()
                .Property(e => e.MarketId)
                .ValueGeneratedNever();
            modelBuilder
                .Entity<Phone>()
                .Property(e => e.PhoneId)
                .ValueGeneratedNever();
        }
    }
}
