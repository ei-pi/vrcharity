"use strict";
{
    const contactContainer = document.querySelector("div#contact-container");

    /**
     * @param {string} name
     * @param {string} title
     * @param {string} email
     */
    function addContact(name, title, email) {
        document.querySelector("div#contact-container div#no-contact")?.remove?.();

        contactContainer.appendChild(makeElement(
            "a",
            {
                className: "contact",
                title: `mailto:${email}`,
                href: `mailto:${email}`,
                tabIndex: 0
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
        ],
        [
            "Albert Patrick",
            "Board Director",
            "apatrick@vrcharity.net"
        ],
        [
            "Katie Reid",
            "Advocacy Director",
            "kare.watashima@vrcharity.net"
        ],
        [
            "Richard Haggerty",
            "Development Director",
            "rhaggerty@vrcharity.net"
        ],
        [
            "Philippe Caissy",
            "Nonprofit administrator",
            "crafttomic@vrcharity.net"
        ],
        [
            "Nathan Kappelman",
            "Director of Philanthropy",
            "tolgalan@vrcharity.net"
        ]
    ].forEach(/** @param {[string, string, string]} e */e => addContact(...e));
}