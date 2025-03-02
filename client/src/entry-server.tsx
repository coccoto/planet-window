// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => (
            <html>
                <head>
                    {assets}
                    {/* Google Fonts */}
                    <link rel='preconnect' href='https://fonts.googleapis.com'></link>
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous'></link>
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500&display=swap'></link>
                </head>
                <body>
                    <div id="app">{children}</div>
                    {scripts}
                </body>
            </html>
        )}
    />
));
