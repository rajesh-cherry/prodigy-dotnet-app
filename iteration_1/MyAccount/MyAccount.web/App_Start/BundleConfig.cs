using System.Configuration;
using System.Web;
using System.Web.Optimization;

namespace MyAccount.web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            string BrandCode = ConfigurationManager.AppSettings["BrandCode"];

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/lib/bootstrap/bootstrap.min.css",
                      "~/Content/lib/montserrat_font/montserrat.css",
                      "~/Content/lib/fontawesome/all.css",
                      "~/Content/css/site.css"));

            if (BrandCode.ToLower() == "gexaix")
            {
                bundles.Add(new StyleBundle("~/Layoutcss").Include("~/Content/css/Gexa-Layout.css"));
            }
            else
            {
                bundles.Add(new StyleBundle("~/Layoutcss").Include("~/Content/css/Frontier-Layout.css"));
            }

        }
    }
}
