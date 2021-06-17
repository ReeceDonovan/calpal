package services

import (
	"context"

	"github.com/CalendarPal/calpal-api/account/models"
	"github.com/google/uuid"
)

// Struct for injecting UserRepository for use in service methods
type UserService struct {
	UserRepository models.UserRepository
}

// UserServiceConfig holds repositories that will be injected into the service layer
type UserServiceConfig struct {
	UserRepository models.UserRepository
}

// Initializing a UserService with its repository layer dependencies
func NewUserService(c *UserServiceConfig) models.UserService {
	return &UserService{
		UserRepository: c.UserRepository,
	}
}

// Retrieves a user based on their uuid
func (s *UserService) Get(ctx context.Context, uid uuid.UUID) (*models.User, error) {

	u, err := s.UserRepository.FindByID(ctx, uid)

	return u, err
}

// Checks using the UserRepository that the email address is available, then signs up the user
func (s *UserService) Signup(ctx context.Context, u *models.User) error {
	panic("Method not implemented")
}
