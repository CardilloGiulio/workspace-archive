using System.Dynamic;
using System.Reflection;

namespace ExtraNet.Recruitments.Persistence;

public class DatabaseOptions
{
    public string? ConnectionString { get; set; }
    public Assembly? MigrationsAssembly { get; set; }
    public bool EnableDebug { get; set; }
    public bool IsInMemory { get; set; }
    public Guid DatabaseName { get; set; } = Guid.NewGuid();  
}
