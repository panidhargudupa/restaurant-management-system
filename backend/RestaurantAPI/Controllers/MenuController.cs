using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Data;
using RestaurantAPI.Models;

namespace RestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly AppDbContext _context;

    public MenuController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/menu
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MenuItem>>> GetAll()
    {
        return await _context.MenuItems.ToListAsync();
    }

    // GET: api/menu/5
    [HttpGet("{id}")]
    public async Task<ActionResult<MenuItem>> GetById(int id)
    {
        var item = await _context.MenuItems.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    // POST: api/menu
    [HttpPost]
    public async Task<ActionResult<MenuItem>> Create(MenuItem item)
    {
        _context.MenuItems.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    // PUT: api/menu/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, MenuItem item)
    {
        if (id != item.Id) return BadRequest();
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/menu/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.MenuItems.FindAsync(id);
        if (item == null) return NotFound();
        _context.MenuItems.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
