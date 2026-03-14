using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Models;

namespace RestaurantAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed some menu items
        modelBuilder.Entity<MenuItem>().HasData(
            new MenuItem { Id = 1, Name = "Butter Chicken", Category = "Main Course", Price = 280, IsAvailable = true, Description = "Creamy tomato based chicken curry", ImageUrl = "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300" },
            new MenuItem { Id = 2, Name = "Paneer Tikka", Category = "Starter", Price = 220, IsAvailable = true, Description = "Grilled cottage cheese with spices", ImageUrl = "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300" },
            new MenuItem { Id = 3, Name = "Masala Dosa", Category = "Breakfast", Price = 120, IsAvailable = true, Description = "Crispy dosa with potato filling", ImageUrl = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300" },
            new MenuItem { Id = 4, Name = "Biryani", Category = "Main Course", Price = 320, IsAvailable = true, Description = "Fragrant basmati rice with spices", ImageUrl = "https://images.unsplash.com/photo-1563379091339-03246963d651?w=300" },
            new MenuItem { Id = 5, Name = "Gulab Jamun", Category = "Dessert", Price = 80, IsAvailable = true, Description = "Soft milk dumplings in sugar syrup", ImageUrl = "https://images.unsplash.com/photo-1601303516534-9b1e60390888?w=300" },
            new MenuItem { Id = 6, Name = "Mango Lassi", Category = "Drinks", Price = 90, IsAvailable = true, Description = "Refreshing mango yogurt drink", ImageUrl = "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300" }
        );
    }
}
