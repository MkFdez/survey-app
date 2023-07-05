# Survey Creator Website

Welcome to the Survey Creator Website! This website allows you to create custom surveys, share them with others, and view detailed metrics about survey responses. The project is built using React, Express, MongoDb, Redux and provides a user-friendly interface for survey creation and management.

## Features

- **User Registration**: Create an account to access the full functionality of the website.
- **Survey Creation**: Design and customize surveys according to your specific needs.
- **Survey Sharing**: Share your surveys by generating unique URLs for each survey.
- **Response Tracking**: Track the number of responses received for each survey.
- **Response Analytics**: View detailed statistics and metrics for survey responses, including answer selections.
- **One-Time Response Limit**: Ensure that each person can only respond to a survey once.

## Getting Started

To get started with the Survey Creator Website, follow these steps:

1. Clone the repository:

   ```shell
   https://github.com/MkFdez/Survey_App.git
2. Install the necessary dependencies. Run the following command in your project directory:

   ```shell
   npm install
3. Configure environment variables of the server. Create a .env file in the root directory of server folder and provide the necessary configuration values:

    ```plaintext
    MONGO_URL=your-mongo-database-url
    SECRET=your-secret-key-for-encoding/decoding-jwt
    # Add any other necessary environment variables here
4. Configure environment variables of the frontend. Create a .env file in the root directory of wonderful-app folder and provide the necessary configuration values:

    ```plaintext
    VITE_IP_API_KEY=api-key-for-ipdata(use any api you want)
    # Add any other necessary environment variables here
5. Start the development server:

    ```shell
        npm run dev
6. Access the website by navigating to http://localhost:5173 in your browser.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-new-feature`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push the changes to your forked repository: `git push origin my-new-feature`.
5. Submit a pull request detailing your changes.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

If you have any questions or suggestions, feel free to contact us at [mirkofs29@outlook.com](mailto:your-email@example.com).

Enjoy creating and sharing surveys with the Survey Creator Website!

