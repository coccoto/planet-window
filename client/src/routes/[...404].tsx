import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
    return (
        <main>
            <Title>Not Found</Title>
            <HttpStatusCode code={404}></HttpStatusCode>
            <div>Not Found</div>
        </main>
    )
}
