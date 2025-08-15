{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,

    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["../next-env.d.ts", "**/*", "../.next/types/**/*.ts"],
  "exclude": ["../node_modules"]
}
