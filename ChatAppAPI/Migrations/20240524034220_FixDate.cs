using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(203));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 357, DateTimeKind.Local).AddTicks(9922));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(3172));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "ChatRooms",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(1001));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "ChatRooms",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(753));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(203),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 357, DateTimeKind.Local).AddTicks(9922),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(3172),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "ChatRooms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(1001),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "ChatRooms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(753),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 5, 20, 13, 41, 53, 357, DateTimeKind.Local).AddTicks(9922), new DateTime(2024, 5, 20, 13, 41, 53, 358, DateTimeKind.Local).AddTicks(203) });
        }
    }
}
