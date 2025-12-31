// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => (
            <html>
                <head>
                    {assets}
                    <meta charset='utf-8'></meta>
                    <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
                    <meta name="description" content='Look out the window into space and explore the solar system in 3D. Rotate planets and discover the wonders of the cosmos.'></meta>
                    <meta name='author' content='coccoto'></meta>
                    {/* OGP */}
                    <meta property='og:url' content='https://planet-window.com/'></meta>
                    <meta property='og:type' content='website'></meta>
                    <meta property='og:title' content='Planet Window<'></meta>
                    <meta property='og:description' content='Look out the window into space and explore the solar system in 3D. Rotate planets and discover the wonders of the cosmos.'></meta>
                    <meta property='og:image' content='favicons/favicon.png'></meta>
                    {/* Favicon */}
                    <link rel='icon' type='image/svg+xml' href='favicons/favicon.svg'></link>
                    {/* Google Fonts */}
                    <link rel='preconnect' href='https://fonts.googleapis.com'></link>
                    <link rel='preconnect' href='https://fonts.gstatic.com'></link>
                    <link href='https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap' rel='stylesheet'></link>
                </head>
                <body>
                    <div id="app">{children}</div>
                    {scripts}
                </body>
            </html>
        )}
    />
));
