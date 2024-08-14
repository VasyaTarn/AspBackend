using System.ComponentModel.DataAnnotations;

namespace AspBackend.Models
{
    public class Doctor
    {
        [Key]
        public Guid Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string PhoneNumber { get; set; }
        public string Specialization { get; set; }
        public string? ClientName { get; set; }
        public string? ClientEmail { get; set; }
        public bool IsClientEmpty { get; set; }
        public string? AppointmentDate { get; set; }

    }
}
