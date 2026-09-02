import { useQuery } from '@tanstack/react-query'
import { GithubLogo, LinkedinLogo, Globe, User } from 'phosphor-react'
import type { ReactElement } from 'react'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucas-de-almeida-monteiro',
    icon: LinkedinLogo,
    color: 'hover:bg-[#0a66c2]'
  },
  {
    label: 'GitHub',
    href: 'https://github.com/lucasdealmeidadev',
    icon: GithubLogo,
    color: 'hover:bg-gray-900'
  },
  {
    label: 'Portfólio',
    href: 'https://lucasdealmeida.com.br/',
    icon: Globe,
    color: 'hover:bg-emerald-500'
  }
]

export function About(): ReactElement {
  const { data } = useQuery({
    queryKey: ['get-app-version'],
    queryFn: () => window.api.getAppVersion()
  })

  return (
    <main className="flex-1 flex flex-col py-12 px-6 md:px-10 text-app-text overflow-y-auto">
      <header className="mb-6">
        <h1 className="text-app-heading text-xl lg:text-2xl font-semibold">Sobre</h1>
      </header>

      <section className="flex flex-1 justify-center">
        <div className="w-full max-w-2xl bg-app-surface border border-app-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-4 p-6 border-b border-app-border">
            <div className="w-16 h-16 rounded-full bg-app-muted flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-app-muted-text" weight="bold" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-app-heading">Lucas de Almeida Monteiro</h2>
              <p className="text-sm text-app-muted-text">Desenvolvedor</p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div>
              <h3 className="text-xs uppercase tracking-wide text-app-muted-text font-semibold mb-1">
                Sobre o projeto
              </h3>
              <p className="text-sm text-app-text leading-relaxed">
                Projeto criado por{' '}
                <span className="font-semibold text-app-heading">Lucas de Almeida Monteiro</span>{' '}
                com o objetivo de gerenciar clientes de forma simples e moderna.
              </p>
            </div>

            <div className="border-t border-app-border pt-5">
              <h3 className="text-xs uppercase tracking-wide text-app-muted-text font-semibold mb-3">
                Redes e links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socialLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className={`flex items-center gap-3 bg-app-muted border border-app-border ${color} hover:border-transparent text-app-text hover:text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors`}
                  >
                    <Icon className="w-5 h-5" weight="bold" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-app-border pt-5 flex items-center justify-between text-xs text-app-muted-text">
              <span>Versão atual</span>
              <span className="font-mono text-app-text bg-app-muted border border-app-border rounded-md px-2 py-1">
                v{data}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
