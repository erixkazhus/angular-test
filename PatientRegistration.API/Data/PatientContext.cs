using Microsoft.EntityFrameworkCore;

namespace PatientRegistration.API.Data
{
    public class PatientContext : DbContext
    {
        public PatientContext(DbContextOptions<PatientContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}
