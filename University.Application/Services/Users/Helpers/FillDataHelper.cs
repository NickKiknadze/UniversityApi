using University.Data.Data.Entities;
using University.Domain.Models.UserModels;

namespace University.Application.Services.Users.Helpers;

public static class FillDataHelper
{
    public static User FillData(this User user, UserPostDto input)
    {
        return user;
    }
    
    public static User FillData(this User user, UserPutDto input)
    {
        return user;
    }
}