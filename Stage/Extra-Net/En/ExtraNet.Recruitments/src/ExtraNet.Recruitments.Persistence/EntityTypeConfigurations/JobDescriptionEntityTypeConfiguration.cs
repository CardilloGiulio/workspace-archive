using ExtraNet.Recruitments.Domain.JobDescriptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExtraNet.Recruitments.Persistence.EntityTypeConfigurations;

public class JobDescriptionEntityTypeConfiguration : IEntityTypeConfiguration<JobDescription>
{
    public void Configure(EntityTypeBuilder<JobDescription> builder)
    {
        builder
            .HasOne(c => c.Customer)
            .WithMany();

        builder
            .Property(j => j.Id)
            .ValueGeneratedNever();
    }
}
