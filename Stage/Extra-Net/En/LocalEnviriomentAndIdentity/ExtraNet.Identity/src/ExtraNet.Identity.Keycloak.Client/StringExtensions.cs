using System.Text.RegularExpressions;

namespace ExtraNet.Identity.Keycloak.Client
{
	public static partial class StringExtensions
	{
		public static string ToIndexed(this string s)
		{
			var counter = 0;
			return ToIndexedRegex().Replace(s.Trim('/'), match => $"{{{counter++}}}");
		}

		[GeneratedRegex(@"\{[^}]+\}")]
		private static partial Regex ToIndexedRegex();
	}
}
