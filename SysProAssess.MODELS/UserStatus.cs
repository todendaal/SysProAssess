using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SysProAssess.MODELS
{
    public class UserStatus
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [ForeignKey("StatusId")]
        public ICollection<User> Users { get; set; }

        [Required]
        public int OrderID { get; set; }

    }
}
