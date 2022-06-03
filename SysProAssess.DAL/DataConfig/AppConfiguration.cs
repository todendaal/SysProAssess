using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace SysPro.DAL.DataConfig
{
    public class AppConfiguration
    {
        public AppConfiguration()
        {
            var configBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            Console.WriteLine("path=" + path);
            configBuilder.AddJsonFile(path, false);
            var root = configBuilder.Build();
            var appSetting = root.GetSection("ConnectionStrings:DefaultConnection");
            Console.WriteLine("appSetting=" + appSetting.ToString());
            Console.WriteLine("appSetting.Value=" + appSetting.Value);
            sqlConnectionString = appSetting.Value;
        }

        public string sqlConnectionString { get; set; }
    }
}
