namespace Skepsi.Api.Migrations
{
    using Skepsi.Api.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Skepsi.Api.PensamentoCtx>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Skepsi.Api.PensamentoCtx context)
        {
            //  This method will be called after migrating to the latest version.

            context.Pensamentos.AddOrUpdate(
              p => p.DescricaoPensamento,
              new Pensamento { DescricaoPensamento = ".NET Rocks", CriadoEm=new DateTime(2015,07,22)},
              new Pensamento { DescricaoPensamento = "AngularJS Rocks", CriadoEm=new DateTime(2015,07,22)}
            );
            
        }
    }
}
