const RegistrationPage = () => {
  return (
    <div class="bg-[url(../../../public/loginInventoryTrackor.jpg)] min-h-screen bg-cover">
      <div class="h-full flex flex-col gap-4 justify-center items-center px-2 py-2 min-w-[300px]">
        <h1 class="text-3xl font-bold">Create Your Account</h1>
        <form
          action="/user/register"
          method="POST"
          class="border max-w-[1000px] min-w-[350px] rounded-xl flex flex-col backdrop-blur-xl border-white items-center mt-2 px-2 py-4 hover:border-green-500 hover:shadow-xl hover:shadow-gray-700"
        >
          <div class="flex flex-col p-4 w-full mb-4 mt-2 gap-4">
            <label for="firstname lastname">Full Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Firstname"
              class="mb-1"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="lastname (optional)"
            />

            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="eg. test@example.com"
            />

            <label for="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="your password"
            />
          </div>

          <p class="mb-1">
            ~ already have an
            <a class="text-blue-600" href="/user/login">
              Account
            </a>{" "}
            ?
          </p>
          <button class="bg-green-500 font-bold text-white w-25 mb-2 py-2 cursor-pointer rounded-[10px] inline hover:bg-green-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
