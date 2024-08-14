using AspBackend.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AspBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;
        
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("CheckDuplicate")]
        public async Task<ActionResult<bool>> CheckDuplicate(string value)
        {
            bool exists = await _context.Users.AnyAsync(u => u.Email == value);
            return exists;
        }

        [HttpPut("SetCurrent/{id}")]
        public async Task<IActionResult> SetCurrent(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.isCurrentUser = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("ResetAllCurrent")]
        public async Task<IActionResult> ResetAllCurrent()
        {
            var users = await _context.Users.Where(u => u.isCurrentUser == true).ToListAsync();

            foreach (var user in users)
            {
                user.isCurrentUser = false;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.isCurrentUser == true);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
