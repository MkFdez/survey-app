using dotnet_server.DataAccess;
using dotnet_server.Models;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using dotnet_server.Services;

namespace dotnet_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        public LoginController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpPost("")]
        public IActionResult Index([FromBody] PostLoginModel userInfo)
        {

            var user = _dataAccess.GetUser(userInfo.username);
            if(SecretHasher.Verify(userInfo.password, user.PasswordHash))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var plain_key = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings")["JWT_SECRET"];
                var key = Encoding.ASCII.GetBytes(plain_key);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, user.Name),
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7), // Set token expiration date
             
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
                return Ok(new {token = tokenString, username = user.Name, name= user.Name, picture = user.Picture  });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
