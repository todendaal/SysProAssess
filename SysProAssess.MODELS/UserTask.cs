using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.MODELS
{
    public class UserTask
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserID { get; set; }

        [Required]
        public Guid UserRoleID { get; set; }

        [Required]
        public string UserRoleName { get; set; }

        [Required]
        public Guid TaskID { get; set; }

        [Required]
        public string TaskName { get; set; }

        [Required]
        public DateTime TaskDate { get; set; }

        [Required]
        public int TaskDuration { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal HourlyRoleRate { get; set; }
    }

    public class RepportQuery
    {
        public DateTime? sdate { get; set; }
        public DateTime? edate { get; set; }
    }
}
