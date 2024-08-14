using AspBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AspBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Doctor> Doctors { get; set; }
    }
}
