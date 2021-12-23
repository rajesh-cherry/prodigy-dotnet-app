using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAccountWebMVC.Controllers
{
    public class PaymentCenterController : Controller
    {
        // GET: PaymentCenter
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PaymentAutopay()
        {
            return View("PaymentAutopay");
        }
        public ActionResult PaymentMethods()
        {
            return View("PaymentMethods");
        }

        public ActionResult Payment_Center()
        {
            return View("Payment_Center");
        }

        public ActionResult PaymentAccount()
        {
            return View("PaymentAccount");
        }
        public ActionResult MakePayment()
        {
            return View("MakePayment");
        }
        public ActionResult PaymentOptions_AutoPay()
        {
            return View("PaymentOptions_AutoPay");
        }
        public ActionResult PaymentOptions()
        {
            return View("PaymentOptions");
        }
        public ActionResult PaymentOptions_BudgetBilling()
        {
            return View("PaymentOptions_BudgetBilling");
        }
        public ActionResult PaymentOptions_PaymentExtension()
        {
            return View("PaymentOptions_PaymentExtension");
        }
        public ActionResult PaymentHistory_Invoices()
        {
            ViewData["PaymentsView"] = "PaymentHistory-Invoices";
            return View();
        }
        public ActionResult PaymentHistory_Payments()
        {
            ViewData["PaymentsView"] = "PaymentHistory-Payments";
            return View();
        }

        public ActionResult PaymentLocation()
        {
            return View("PaymentLocation");
        }

        public ActionResult PaymentHistory()
        {
            return View("PaymentHistory");
        }

        public ActionResult PaymentDetails(string transactionId)
        {
            ViewData["transactionId"] = transactionId;
            return View("PaymentDetails");
        }
        public ActionResult AddFund()
        {
            return View();
        }
        public ActionResult PaymentMethod()
        {
            return View();
        }
        public ActionResult MobileAddNewCard()
        {
            return View();
        }
        public ActionResult MobilePaymentAccount()
        {
            return View();
        }
        public ActionResult PaymentFaq()
        {
            return View();
        }
    }
}