using System.ComponentModel.DataAnnotations;

namespace AspBackend.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public bool? isCurrentUser { get; set; }
    }
}
