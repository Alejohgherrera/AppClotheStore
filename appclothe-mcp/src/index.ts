import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

// Obtener la ubicación actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta raíz de AppClotheStore
const projectRoot = path.resolve(__dirname, "../..");

// Carpetas que no queremos incluir
const IGNORED_DIRECTORIES = new Set([
    "node_modules",
    ".git",
    ".expo",
    "dist",
    "build",
]);

// Función para recorrer las carpetas
async function getDirectoryStructure(
    directory: string,
    prefix = ""
): Promise<string[]> {
    const entries = await fs.readdir(directory, {
        withFileTypes: true,
    });

    const structure: string[] = [];

    for (const entry of entries) {
        // Ignorar carpetas innecesarias
        if (
            entry.isDirectory() &&
            IGNORED_DIRECTORIES.has(entry.name)
        ) {
            continue;
        }

        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            structure.push(`${prefix}📁 ${entry.name}/`);

            const children = await getDirectoryStructure(
                entryPath,
                `${prefix}  `
            );

            structure.push(...children);
        } else {
            structure.push(`${prefix}📄 ${entry.name}`);
        }
    }

    return structure;
}

// Crear servidor MCP
const server = new McpServer({
    name: "appclothe-mcp",
    version: "1.0.0",
});

// Registrar herramienta
server.registerTool(
    "get_project_structure",
    {
        description:
            "Obtiene la estructura de archivos y carpetas de AppClotheStore, excluyendo carpetas de dependencias y archivos innecesarios.",
    },
    async () => {
        const structure = await getDirectoryStructure(projectRoot);

        return {
            content: [
                {
                    type: "text",
                    text: structure.join("\n"),
                },
            ],
        };
    }
);

// Crear transporte STDIO
const transport = new StdioServerTransport();

// Conectar servidor MCP
await server.connect(transport);