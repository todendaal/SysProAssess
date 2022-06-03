using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.MODELS
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(30)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(30)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(15)]
        public string IDNumber { get; set; }

        [StringLength(100)]
        public string ProfilePicURL { get; set; }

        [Required]
        public Guid RoleID { get; set; }

        [Required]
        public Guid StatusId { get; set; }

        [Required]
        public DateTime StatusDate { get; set; } = DateTime.Now;

        public string RoleName { get; set; } = "";
        public string StatusName { get; set; } = "";

        [ForeignKey("UserID")]
        public ICollection<UserTask> UserTasks { get; set; }
    }
}
