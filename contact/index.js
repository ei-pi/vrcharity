"use strict";
{
    const contactContainer = document.querySelector("div#contact-container");

    function addContact(name, title, email) {
        contactContainer.appendChild(makeElement(
            "a",
            {
                className: "contact",
                title: `mailto:${email}`,
                href: `mailto:${email}`,
            },
            [
                makeElement(
                    "p",
                    {
                        innerText: `${name ?? email}\n`
                    },
                    makeElement(
                        "span",
                        {
                            innerText: title ?? ""
                        }
                    )
                ),
            ]
        ));
    }

    [
        [
            "General inquiries",
            "",
            "contact@vrcharity.net"
        ],
        [
            "Franklin Lapinski",
            "Executive Director",
            "flapinski@vrcharity.net"
        ]
    ].forEach(e => addContact(...e));
}