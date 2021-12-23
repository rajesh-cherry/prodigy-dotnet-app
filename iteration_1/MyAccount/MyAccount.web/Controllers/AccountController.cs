using System.Web.Mvc;
using System.Configuration;
using System.Web;
using System.Text;
using System;

namespace MyAccountWebMVC.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Index(string AccountNumber)
        {
            var produrl = ConfigurationManager.AppSettings["AccountPayURL"];
            HttpCookie RememberMe = Request.Cookies["rememberMe"];
            HttpCookie Email = Request.Cookies["encodedUser"];
            if (RememberMe != null && Email != null)
            {
                var url = produrl + "/Login/Login?user=" + Email.Value;
                Response.Redirect(url);
            }
            else
            {
                return View("Index");
            }
            ViewData["AccountNumber"] = AccountNumber;
            return View("Index");
        }

        public ActionResult ForgotEmail()
        {
            return View("ForgotEmail");
        }

        public ActionResult EmailNotReceived()
        {
            return View("EmailNotReceived");
        }

        public ActionResult Login(string user)
        {
            if (user != null)
            {
                user = Encoding.UTF8.GetString(Convert.FromBase64String(user));
                ViewData["user"] = user;
            }
            else
            {
                ViewData["user"] = "";
            }

            Session["LoginUserName"] = user;
            return View("Login");
        }

        public ActionResult Retrieve()
        {
            return View("Retrieve");
        }

        public ActionResult ForgotPassword()
        {
            return View("ForgotPassword");
        }

        public ActionResult Register()
        {
            return View("Register");
        }

        public ActionResult SSNVerify(string accountNo)
        {
            ViewData["accountNo"] = accountNo;
            return View("SSNVerify");
        }

        public ActionResult CreatePassword(string user, string accountNo)
        {
            if (accountNo != null && user != null)
            {
                accountNo = Encoding.UTF8.GetString(Convert.FromBase64String(accountNo));
                user = Encoding.UTF8.GetString(Convert.FromBase64String(user));
                ViewData["accountNo"] = accountNo;
                ViewData["user"] = user;
            }
            else
            {
                ViewData["accountNo"] = "";
                ViewData["user"] = "";
            }
            return View("CreatePassword");
        }

        public ActionResult RegistrationSuccessful()
        {
            return View("RegistrationSuccessful");
        }

        public ActionResult VerifyOtp()
        {
            return View("VerifyOtp");
        }

        public ActionResult MailSent()
        {
            return View("MailSent");
        }

        public ActionResult ResetPassword(string accountNo)
        {
            if (accountNo != null)
            {
                accountNo = Encoding.UTF8.GetString(Convert.FromBase64String(accountNo));
                ViewData["accountNo"] = accountNo;
            }
            else
            {
                ViewData["accountNo"] = "";
            }
            return View("ResetPassword");
        }
    }
}
