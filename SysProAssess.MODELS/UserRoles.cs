using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.MODELS
{
    public class UserRole
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(100)]
        public string RoleName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal RoleRate { get; set; } = 0;

        [ForeignKey("RoleID")]
        public ICollection<User> Users { get; set; }
    }
}
