# @thonlabs/config-biome

Shared Biome configuration for ThonLabs projects.

## Usage

To use this configuration in your project, create or update your `biome.json` file to extend this configuration:

```json
{
	"extends": ["./config-biome/biome.base.json"]
}
```

Or if installed as a package:

```json
{
	"extends": ["@thonlabs/config-biome/biome.base.json"]
}
```

## Configuration Details

This configuration includes:

- **VCS Integration**: Enabled with Git support and ignore file usage
- **File Handling**: Includes TypeScript, JavaScript, JSON, and Markdown files while excluding build outputs
- **Formatting**: Tab indentation and single quotes for JavaScript
- **Linting**: Recommended rules with specific overrides for ThonLabs projects
- **Assist Features**: Enabled with import organization disabled

## Customization

Projects can override specific settings by adding them to their local `biome.json` file after the extends declaration.