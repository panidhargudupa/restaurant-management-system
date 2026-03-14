using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Data;
using RestaurantAPI.Models;

namespace RestaurantAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/order
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAll()
    {
        return await _context.Orders.Include(o => o.OrderItems)
            .ThenInclude(oi => oi.MenuItem).ToListAsync();
    }

    // GET: api/order/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetById(int id)
    {
        var order = await _context.Orders.Include(o => o.OrderItems)
            .ThenInclude(oi => oi.MenuItem)
            .FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound();
        return order;
    }

    // POST: api/order
    [HttpPost]
    public async Task<ActionResult<Order>> Create(Order order)
    {
        order.OrderDate = DateTime.UtcNow;
        order.Status = "Pending";

        // Calculate total
        decimal total = 0;
        foreach (var item in order.OrderItems)
        {
            var menuItem = await _context.MenuItems.FindAsync(item.MenuItemId);
            if (menuItem != null)
            {
                item.Price = menuItem.Price;
                total += menuItem.Price * item.Quantity;
            }
        }
        order.TotalAmount = total;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    // PUT: api/order/5/complete
    [HttpPut("{id}/complete")]
    public async Task<IActionResult> Complete(int id, [FromBody] string paymentMethod)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();
        order.Status = "Completed";
        order.PaymentMethod = paymentMethod;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
