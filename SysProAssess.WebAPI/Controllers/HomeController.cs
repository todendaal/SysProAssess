using Microsoft.AspNetCore.Mvc;

namespace SysProAssess.WebAPI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
