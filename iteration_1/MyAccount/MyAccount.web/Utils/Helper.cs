using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyAccount.web.Utils
{
    public class Helper
    {
        public static string StringtoMD5(string Content)
        {
            //alternative hash algo 
            System.Security.Cryptography.MD5CryptoServiceProvider M5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] ByteString = System.Text.Encoding.ASCII.GetBytes(Content);
            ByteString = M5.ComputeHash(ByteString);
            string FinalString = null;
            foreach (byte bt in ByteString)
            {
                FinalString += bt.ToString("x2");
            }
            return FinalString.ToUpper();
        }
    }
}