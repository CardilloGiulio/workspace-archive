using ExtraNet.Recruitments.Domain.HumanResources;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExtraNet.Recruitments.Persistence.EntityTypeConfigurations;

public class HumanResourceEntityTypeConfiguration : IEntityTypeConfiguration<HumanResource>
{
    public void Configure(EntityTypeBuilder<HumanResource> builder)
    {
        builder
            .Property(h => h.Id)
            .ValueGeneratedNever();
    }
}
