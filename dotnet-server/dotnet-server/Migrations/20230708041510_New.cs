using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_server.Migrations
{
    /// <inheritdoc />
    public partial class New : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    passwordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    picture = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Surveys",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ownerid = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isPublic = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surveys", x => x.id);
                    table.ForeignKey(
                        name: "FK_Surveys_Users_ownerid",
                        column: x => x.ownerid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    q = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    m = table.Column<bool>(type: "bit", nullable: false),
                    t = table.Column<int>(type: "int", nullable: false),
                    Surveyid = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.id);
                    table.ForeignKey(
                        name: "FK_Question_Surveys_Surveyid",
                        column: x => x.Surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveysResponse",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    surveyid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    response = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveysResponse", x => x.id);
                    table.ForeignKey(
                        name: "FK_SurveysResponse_Surveys_surveyid",
                        column: x => x.surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsedIps",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surveyid = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsedIps", x => x.id);
                    table.ForeignKey(
                        name: "FK_UsedIps_Surveys_Surveyid",
                        column: x => x.Surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "PossibleAnswer",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Questionid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    a = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    t = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PossibleAnswer", x => x.id);
                    table.ForeignKey(
                        name: "FK_PossibleAnswer_Question_Questionid",
                        column: x => x.Questionid,
                        principalTable: "Question",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PossibleAnswer_Questionid",
                table: "PossibleAnswer",
                column: "Questionid");

            migrationBuilder.CreateIndex(
                name: "IX_Question_Surveyid",
                table: "Question",
                column: "Surveyid");

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_ownerid",
                table: "Surveys",
                column: "ownerid");

            migrationBuilder.CreateIndex(
                name: "IX_SurveysResponse_surveyid",
                table: "SurveysResponse",
                column: "surveyid");

            migrationBuilder.CreateIndex(
                name: "IX_UsedIps_Surveyid",
                table: "UsedIps",
                column: "Surveyid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PossibleAnswer");

            migrationBuilder.DropTable(
                name: "SurveysResponse");

            migrationBuilder.DropTable(
                name: "UsedIps");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Surveys");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
