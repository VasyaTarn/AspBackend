using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isCurrentUser",
                table: "Users",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCurrentUser",
                table: "Users");
        }
    }
}
