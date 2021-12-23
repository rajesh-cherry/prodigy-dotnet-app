using MyAccount.web.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MyAccount.web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);            
        }

        void Session_Start(object sender, EventArgs e)
        {
            var produrl = ConfigurationManager.AppSettings["AccountPayURL"];

            if (Session["LoginUserName"] == null)
            {
                if (Global.isUserLoggedIn)
                {
                    Global.isUserLoggedIn = false;
                    Response.Redirect(produrl + "/Login/SessionPop");
                }
                else
                {
                    Response.Redirect(produrl + "/");
                }
            }
        }






    }    
}
