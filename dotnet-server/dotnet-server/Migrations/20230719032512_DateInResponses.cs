using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_server.Migrations
{
    /// <inheritdoc />
    public partial class DateInResponses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PossibleAnswer_Question_Questionid",
                table: "PossibleAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_Surveys_Surveyid",
                table: "Question");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Users_ownerid",
                table: "Surveys");

            migrationBuilder.DropForeignKey(
                name: "FK_SurveysResponse_Surveys_surveyid",
                table: "SurveysResponse");

            migrationBuilder.DropForeignKey(
                name: "FK_UsedIps_Surveys_Surveyid",
                table: "UsedIps");

            migrationBuilder.RenameColumn(
                name: "picture",
                table: "Users",
                newName: "Picture");

            migrationBuilder.RenameColumn(
                name: "passwordHash",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ip",
                table: "UsedIps",
                newName: "Ip");

            migrationBuilder.RenameColumn(
                name: "Surveyid",
                table: "UsedIps",
                newName: "SurveyId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "UsedIps",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_UsedIps_Surveyid",
                table: "UsedIps",
                newName: "IX_UsedIps_SurveyId");

            migrationBuilder.RenameColumn(
                name: "surveyid",
                table: "SurveysResponse",
                newName: "SurveyId");

            migrationBuilder.RenameColumn(
                name: "response",
                table: "SurveysResponse",
                newName: "Response");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "SurveysResponse",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_SurveysResponse_surveyid",
                table: "SurveysResponse",
                newName: "IX_SurveysResponse_SurveyId");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Surveys",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "ownerid",
                table: "Surveys",
                newName: "OwnerId");

            migrationBuilder.RenameColumn(
                name: "isPublic",
                table: "Surveys",
                newName: "IsPublic");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "Surveys",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Surveys",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Surveys_ownerid",
                table: "Surveys",
                newName: "IX_Surveys_OwnerId");

            migrationBuilder.RenameColumn(
                name: "t",
                table: "Question",
                newName: "T");

            migrationBuilder.RenameColumn(
                name: "q",
                table: "Question",
                newName: "Q");

            migrationBuilder.RenameColumn(
                name: "m",
                table: "Question",
                newName: "M");

            migrationBuilder.RenameColumn(
                name: "Surveyid",
                table: "Question",
                newName: "SurveyId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Question",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Question_Surveyid",
                table: "Question",
                newName: "IX_Question_SurveyId");

            migrationBuilder.RenameColumn(
                name: "t",
                table: "PossibleAnswer",
                newName: "T");

            migrationBuilder.RenameColumn(
                name: "a",
                table: "PossibleAnswer",
                newName: "A");

            migrationBuilder.RenameColumn(
                name: "Questionid",
                table: "PossibleAnswer",
                newName: "QuestionId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "PossibleAnswer",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_PossibleAnswer_Questionid",
                table: "PossibleAnswer",
                newName: "IX_PossibleAnswer_QuestionId");

            migrationBuilder.AddColumn<DateTime>(
                name: "date",
                table: "SurveysResponse",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_PossibleAnswer_Question_QuestionId",
                table: "PossibleAnswer",
                column: "QuestionId",
                principalTable: "Question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_Surveys_SurveyId",
                table: "Question",
                column: "SurveyId",
                principalTable: "Surveys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Users_OwnerId",
                table: "Surveys",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveysResponse_Surveys_SurveyId",
                table: "SurveysResponse",
                column: "SurveyId",
                principalTable: "Surveys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsedIps_Surveys_SurveyId",
                table: "UsedIps",
                column: "SurveyId",
                principalTable: "Surveys",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PossibleAnswer_Question_QuestionId",
                table: "PossibleAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_Surveys_SurveyId",
                table: "Question");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Users_OwnerId",
                table: "Surveys");

            migrationBuilder.DropForeignKey(
                name: "FK_SurveysResponse_Surveys_SurveyId",
                table: "SurveysResponse");

            migrationBuilder.DropForeignKey(
                name: "FK_UsedIps_Surveys_SurveyId",
                table: "UsedIps");

            migrationBuilder.DropColumn(
                name: "date",
                table: "SurveysResponse");

            migrationBuilder.RenameColumn(
                name: "Picture",
                table: "Users",
                newName: "picture");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "passwordHash");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "SurveyId",
                table: "UsedIps",
                newName: "Surveyid");

            migrationBuilder.RenameColumn(
                name: "Ip",
                table: "UsedIps",
                newName: "ip");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UsedIps",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_UsedIps_SurveyId",
                table: "UsedIps",
                newName: "IX_UsedIps_Surveyid");

            migrationBuilder.RenameColumn(
                name: "SurveyId",
                table: "SurveysResponse",
                newName: "surveyid");

            migrationBuilder.RenameColumn(
                name: "Response",
                table: "SurveysResponse",
                newName: "response");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SurveysResponse",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_SurveysResponse_SurveyId",
                table: "SurveysResponse",
                newName: "IX_SurveysResponse_surveyid");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Surveys",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Surveys",
                newName: "ownerid");

            migrationBuilder.RenameColumn(
                name: "IsPublic",
                table: "Surveys",
                newName: "isPublic");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Surveys",
                newName: "date");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Surveys",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Surveys_OwnerId",
                table: "Surveys",
                newName: "IX_Surveys_ownerid");

            migrationBuilder.RenameColumn(
                name: "T",
                table: "Question",
                newName: "t");

            migrationBuilder.RenameColumn(
                name: "SurveyId",
                table: "Question",
                newName: "Surveyid");

            migrationBuilder.RenameColumn(
                name: "Q",
                table: "Question",
                newName: "q");

            migrationBuilder.RenameColumn(
                name: "M",
                table: "Question",
                newName: "m");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Question",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Question_SurveyId",
                table: "Question",
                newName: "IX_Question_Surveyid");

            migrationBuilder.RenameColumn(
                name: "T",
                table: "PossibleAnswer",
                newName: "t");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "PossibleAnswer",
                newName: "Questionid");

            migrationBuilder.RenameColumn(
                name: "A",
                table: "PossibleAnswer",
                newName: "a");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PossibleAnswer",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_PossibleAnswer_QuestionId",
                table: "PossibleAnswer",
                newName: "IX_PossibleAnswer_Questionid");

            migrationBuilder.AddForeignKey(
                name: "FK_PossibleAnswer_Question_Questionid",
                table: "PossibleAnswer",
                column: "Questionid",
                principalTable: "Question",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_Surveys_Surveyid",
                table: "Question",
                column: "Surveyid",
                principalTable: "Surveys",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Users_ownerid",
                table: "Surveys",
                column: "ownerid",
                principalTable: "Users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveysResponse_Surveys_surveyid",
                table: "SurveysResponse",
                column: "surveyid",
                principalTable: "Surveys",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsedIps_Surveys_Surveyid",
                table: "UsedIps",
                column: "Surveyid",
                principalTable: "Surveys",
                principalColumn: "id");
        }
    }
}
