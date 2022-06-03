using Microsoft.AspNetCore.Mvc;
using SysProAssess.API.Models;
using SysProAssess.MODELS;
using System.Diagnostics;

namespace SysProAssess.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Assessment2()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ReportData(RepportQuery MyModel)
        {

            RepportQuery qryModel = new RepportQuery { sdate = DateTime.Now.AddDays(-20), edate = DateTime.Now.AddDays(20) };

            if (ModelState.IsValid)
            {
                qryModel.sdate = MyModel.sdate;
                qryModel.edate = MyModel.edate;
            };
            return View(qryModel);
        }

        public IActionResult ReportData()
        {
            RepportQuery qryModel = new RepportQuery { sdate = DateTime.Now.AddDays(-30), edate = DateTime.Now.AddDays(30) };
            return View(qryModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}