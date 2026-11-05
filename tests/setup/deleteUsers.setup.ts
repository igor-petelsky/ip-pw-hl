import { test as setup } from "@playwright/test";
import UsersService from "../../utils/api/services/UsersService";
import AuthService from "../../utils/api/services/AuthService";
import { testUser1, testUser2 } from "../../test-data/validUsers";

let usersService: UsersService;
let authService: AuthService;

setup.describe("Delete test users via API", () => {
  setup.beforeEach(({ request }) => {
    usersService = new UsersService(request);
    authService = new AuthService(request);
  });

  setup("Delete users", async () => {
    for (const user of Object.values({
      testuser1: testUser1,
      testuser2: testUser2,
    })) {
      try {
        const sid = await authService.getAuthCookie(user.email, user.password);

        await usersService.deleteUser(sid);

        console.log(`User ${user.email} was deleted`);
      } catch (error) {}
    }
  });

  // setup('Delete user testuser1', async () => {
  //     const sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
  //     await usersService.deleteUser(sid);
  // })

  // setup('Delete user testuser2', async () => {
  //     const sid = await authService.getAuthCookie(testUser2.email, testUser2.password);
  //     await usersService.deleteUser(sid);
  // })
});
