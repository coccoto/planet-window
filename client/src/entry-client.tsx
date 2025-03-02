// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"
import "~/styles/foundation/base.css"
import "~/styles/foundation/reset.css"

mount(() => {
    return <StartClient></StartClient>
}, document.getElementById("app") !)
