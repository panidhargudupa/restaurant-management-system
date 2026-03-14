using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models;

public class MenuItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    public bool IsAvailable { get; set; } = true;

    public string ImageUrl { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
}
