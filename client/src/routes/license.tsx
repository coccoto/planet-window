import { Title } from '@solidjs/meta';
import '~/styles/routes/license.css';

export default function License() {

    const licenses = [
        {
            name: 'Solar System Scope',
            url: 'https://www.solarsystemscope.com/',
            license: 'CC BY 4.0',
        }
    ];

    return (
        <main>
            <Title>License - Planet Window</Title>
            <h1>License Information</h1>
            <div>This app uses the following resources</div>
            <ul>
                {licenses.map((item) => (
                    <li>
                        <a href={item.url} target='_blank' rel='noopener noreferrer'>{item.name}</a> licensed under {item.license}.
                    </li>
                ))}
            </ul>
        </main>
    );
}
