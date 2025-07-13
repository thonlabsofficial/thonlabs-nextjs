# CI/CD Workflows

This directory contains GitHub Actions workflows for continuous integration and validation.

## Workflows

### 1. `ci.yml` - Basic CI Validation
- **Trigger**: Pull requests to main/master
- **Purpose**: Quick validation of code quality
- **Validations**:
  - TypeScript compilation (`pnpm compile`)
  - Tailwind CSS compilation (`pnpm tailwind:build`)
  - ESLint linting (`pnpm lint`)
  - Biome code formatting (`pnpm format:check`)

### 2. `build.yml` - Build Validation
- **Trigger**: Pull requests to main/master
- **Purpose**: Comprehensive build testing
- **Validations**:
  - Full library build (`pnpm build`)
  - Build artifact verification
  - TypeScript declaration validation
  - Package exports testing

### 3. `pr-validation.yml` - Comprehensive PR Validation
- **Trigger**: Pull requests to main/master
- **Purpose**: Complete validation with parallel execution
- **Features**:
  - Parallel execution of all validations for faster feedback
  - Detailed validation results reporting
  - Build verification in separate job
  - Automatic cleanup of build artifacts

## Branch Protection

To ensure code quality, consider enabling branch protection rules that require:
- ✅ All CI workflows to pass
- ✅ At least one code review
- ✅ Up-to-date branches before merging

## Local Development

Before pushing changes, you can run the same validations locally:

```bash
# TypeScript compilation
pnpm compile

# Tailwind CSS compilation
pnpm tailwind:build

# Linting
pnpm lint

# Format checking
pnpm format:check

# Full build
pnpm build
```

## Scripts Added

A new script was added to `package.json`:
- `tailwind:build`: Compiles Tailwind CSS from `src/shared/styles/globals.css` to `src/shared/styles/output.css`