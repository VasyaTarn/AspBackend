using Microsoft.AspNetCore.Mvc;
using AspBackend.Models;
using AspBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace AspBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DoctorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Doctor>> AddDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDoctors), new { id = doctor.Id }, doctor);
        }

        [HttpGet("CheckDuplicate")]
        public async Task<ActionResult<bool>> CheckDoctorDuplicate(Doctor doctor)
        {
            bool exists = await _context.Doctors.AnyAsync(d => d.FirstName == doctor.FirstName && d.LastName == doctor.LastName && d.MiddleName == doctor.MiddleName && d.PhoneNumber == doctor.PhoneNumber && d.Specialization == doctor.Specialization);
            return exists;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(Guid id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(Guid id, Doctor doctor)
        {
            if (id != doctor.Id)
            {
                return BadRequest();
            }

            _context.Entry(doctor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
