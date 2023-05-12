import inquirer from "inquirer";
import "colors";

const questions = [
    {
        type: "list",
        name: "option",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${"2.".green} Historial`,
            },
            {
                value: 0,
                name: `${"0.".green} Salir`,
            },
        ],
    },
];

export const inquirerMenu = async () => {
    console.clear();
    console.log("==========================".green);
    console.log("   Seleccione una opción   ".green);
    console.log("==========================\n".green);

    const { option } = await inquirer.prompt(questions);

    return option;
};

export const pause = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"enter".green} para continuar`,
        },
    ];

    console.log("\n");
    await inquirer.prompt(question);
};

export const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }

                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
};

export const listarLugares = async (lugares = []) => {
    const choices = lugares.map(({ id, name }, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: id,
            name: `${idx} ${name}`,
        };
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: "id",
            message: "Seleccione lugar: ",
            choices
        }
    ]

    const { id } = await inquirer.prompt(question)

    return id
}

export const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)

    return ok
}

export const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map(({ id, desc, completadoEn }, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: id,
            name: ` ${idx} ${desc}`,
            checked: completadoEn ? true : false
        };
    });

    const question = [
        {
            type: 'checkbox',
            name: "ids",
            message: "Selecciones",
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question)

    return ids
}

