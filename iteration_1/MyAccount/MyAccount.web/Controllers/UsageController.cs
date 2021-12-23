using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAccount.web.Controllers
{
    public class UsageController : Controller
    {
        // GET: Usage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult History()
        {
            return View();
        }

        public ActionResult EnergySavingTips()
        {
            return View();
        }

        public ActionResult EnergySavingTipsDetails()
        {
            return View();
        }

    }
}